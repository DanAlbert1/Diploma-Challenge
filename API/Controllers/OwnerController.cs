using System.Text.RegularExpressions;
using API.Helpers;
using API.models;
using Auth0.ManagementApi;
using Auth0.ManagementApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/owner")]
public class OwnerController : ControllerBase
{
    private readonly PetContext _context;

    protected readonly IConfiguration Configuration;

    public OwnerController(PetContext context,IConfiguration configuration)
    {
        _context = context;
        Configuration = configuration;
    }   

    [HttpPost]
    [Route("sign-up")]
    public async Task<ActionResult<Response<Owner?>>> CreateOwner([FromBody] OwnerSignUpReq ownerSignUpReq)
    {
        try
        {
            Response<Owner?> response;

            //check owner email is not already in the database
            var isOwner = await _context.Owner
            .Where(o => o.Email == ownerSignUpReq.email)
            .FirstOrDefaultAsync();

            
            if ( isOwner != null ){
                response = new Response<Owner?>(isOwner, false, "Owner already Exists!");
                return StatusCode(409, response);
            }

            ManagementHelper managementHelper = new ManagementHelper();

            var token = managementHelper.GetManagementToken(Configuration);

            var clientManagement = new ManagementApiClient(token, new Uri(Configuration["Auth0:ManagementAudience"]));

            var newUser = new UserCreateRequest();
            newUser.Connection = "Username-Password-Authentication";
            newUser.Email = ownerSignUpReq.email;                        
            newUser.FirstName = ownerSignUpReq.firstName;
            newUser.LastName = ownerSignUpReq.lastName;
            newUser.Password = ownerSignUpReq.password;

            var resp = await clientManagement
            .Users.CreateAsync(newUser);

            var userID = resp.UserId;

            var newOwner =
            new Owner(
                userID,
                ownerSignUpReq.lastName,
                ownerSignUpReq.firstName,
                ownerSignUpReq.phoneNumber,
                ownerSignUpReq.email
            );

            await _context.Owner.AddAsync(newOwner);
            await _context.SaveChangesAsync();

            response = new Response<Owner?>(newOwner, true, "Owner successfully created.");
            
            return Ok(response);
                     
        }
        catch (System.Exception)
        {

            throw;
        }
    }

    
    [HttpGet]
    [Authorize]
    [Route("get-user")]
    public async Task<ActionResult<Response<Owner?>>> CreateOwner(){

        var sub = HttpContext?.User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

        var owner = await _context.Owner
        .Where(o => o.UserID == sub)
        .FirstOrDefaultAsync();

        var response = new Response<Owner?>(owner, true, "Owner Successfully returned.");

        return Ok(response);

    }

    [HttpPost]
    [Authorize]
    [Route("update-owner")]
    public async Task<ActionResult<Response<Owner?>>> UpdateOwner([FromBody] OwnerSignUpReq? updateUserReq){

        var sub = HttpContext?.User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

        var owner = await _context.Owner
        .Where(o => o.UserID == sub)
        .FirstOrDefaultAsync();

        if(owner == null){
            //create owner table record
            return StatusCode(409, "boo");
        }

        var managementHelper = new ManagementHelper();

        var token = managementHelper.GetManagementToken(Configuration);

        var clientManagement = new ManagementApiClient(token, new Uri("https://dev-tt6-hw09.us.auth0.com/api/v2"));

        var updateUser = new UserUpdateRequest();

        updateUser.Email = updateUserReq?.email;
        updateUser.FirstName = updateUserReq?.firstName;
        updateUser.LastName = updateUserReq?.lastName;


        await clientManagement.Users.UpdateAsync(sub, updateUser);

        owner.Email = updateUserReq?.email != null ? updateUserReq.email : owner.Email;
        owner.Firstname = updateUserReq?.firstName != null ? updateUserReq.firstName : owner.Firstname;
        owner.Surname = updateUserReq?.lastName != null ? updateUserReq.lastName : owner.Surname;
        owner.Phone = updateUserReq?.phoneNumber != null ? updateUserReq.phoneNumber : owner.Phone;

        await _context.SaveChangesAsync();

        return Ok(owner);

    }

    [HttpGet]
    [Authorize]
    [Route("view-pets")]
    public async Task<ActionResult<List<Pet>>> ViewPets(){
        
        var sub = HttpContext?.User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

        int ownerID = await _context.Owner
        .Where(o => o.UserID == sub)
        .Select(o => o.OwnerId)
        .FirstOrDefaultAsync();

        if(ownerID <= 0){
            //create owner table record
            return StatusCode(409, "boo");
        }


        var pets = await _context.Pet
        .Where(p => p.OwnerId == ownerID)
        .ToListAsync();

        return Ok(pets);

    }


    [HttpGet]
    [Authorize]
    [Route("view-treatments")]
    public async Task<ActionResult<List<ViewTreatment>>> ViewTreatments()
    {

        var sub = HttpContext?.User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

        int ownerID = await _context.Owner
        .Where(o => o.UserID == sub)
        .Select(o => o.OwnerId)
        .FirstOrDefaultAsync();

        if(ownerID <= 0){
            //create owner table record
            return StatusCode(409, "Boo");
        }

        var treatments = await _context.view_Treatment
        .Where(treatment => treatment.OwnerID == ownerID)
        .ToListAsync();

        return Ok(treatments);

    }


    [HttpGet]
    [Authorize]
    [Route("procedures")]
    public async Task<ActionResult<List<Procedure>>> ViewProcedures()
    {      
        var procedures =
        await _context.Procedure   
        .ToListAsync();

        return Ok(procedures);
    }

    [HttpPost]
    [Authorize]
    [Route("create-treatment")]
    public async Task<ActionResult<Treatment>> CreateTreatment([FromBody] TreatmentReq treatmentReq){

        var sub = HttpContext?.User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

        int ownerID = await _context.Owner
        .Where(o => o.UserID == sub)
        .Select(o => o.OwnerId)
        .FirstOrDefaultAsync();

        if(ownerID <= 0){
            //create owner table record
            return StatusCode(409, "boo");
        }

        var treatment = new Treatment(
            ownerID,
             treatmentReq.PetName,
             treatmentReq.ProcedureID,
             treatmentReq.Date,
             treatmentReq.Notes,
             0
            );

        await _context.Treatment.AddAsync(treatment);
        var resp = await _context.SaveChangesAsync();

        return Ok(resp);
    }
}
