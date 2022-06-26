using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class OwnerController : ControllerBase
{

    private readonly DiplomaChallengeSem1Context _context;

    public OwnerController(DiplomaChallengeSem1Context context)
    {
        _context = context;
    }

    [HttpGet]
    [Route("get-owner/{userId:int}")]
    public async Task<ActionResult<Owner>> getOwners(){
        var userId = Convert.ToInt32(RouteData.Values["userId"]);

        var owner = await _context.OWNER
        .Where(o => o.OwnerId == userId)
        .FirstOrDefaultAsync();

        return Ok(owner);
    }

    [HttpPost]
    [Route("register")]
    public async Task<ActionResult<Response<Owner?>>> register([FromBody] CreateOwnerReq ownerReq) {
        //check owner doesn't already exist
        var IsOwner = await _context.OWNER
        .Where(o => o.Phone == ownerReq.Phone)
        .FirstOrDefaultAsync();

        Response<Owner?> response;

        if(IsOwner != null){
            response = new Response<Owner?>(null, false, "Phone Number taken");

            return StatusCode(409, response);
        }

        var newOwner = new Owner();

        newOwner.Surname = ownerReq.Surname;
        newOwner.FirstName = ownerReq.FirstName;
        newOwner.Phone = ownerReq.Phone;

        await _context.OWNER.AddAsync(newOwner);

        await _context.SaveChangesAsync();

        var owner = await _context.OWNER
        .Where(o => o.Phone == newOwner.Phone)
        .FirstOrDefaultAsync();

        response = new Response<Owner?>(newOwner, true, "Owner successfully created");

        return Ok(response);

    }

    [HttpPost]
    [Route("login")]
    public async Task<ActionResult<Response<Owner?>>> login([FromBody] LoginModel user)
    {
        var owner = await _context.OWNER
        .Where(o => o.Phone == user.Phone)
        .FirstOrDefaultAsync();

        Response<Owner?> response;

        if(owner == null){
            response = new Response<Owner?>(null, false, "owner not found");

            return StatusCode(409, response);
        }

        response = new Response<Owner?>(owner, true, "owner retrieved");

        return Ok(response);
    }

    [HttpPut]
    [Route("update-owner/{userId:int}")]
    public async Task<ActionResult<Response<Owner?>>> updateOwner([FromBody] CreateOwnerReq ownerReq ){
        
        var userId = Convert.ToInt32(RouteData.Values["userId"]);

        var owner = await _context.OWNER
        .Where(o => o.OwnerId == userId)
        .FirstOrDefaultAsync();

        Response<Owner?> response;

        if( owner == null){
            response = new Response<Owner?>(owner, false, "Owner not found");

            return StatusCode(409, response);
        }

        var isNumberTaken = await _context.OWNER
        .Where(o => o.Phone != owner.Phone)
        .Where(o => o.Phone == ownerReq.Phone)
        .FirstOrDefaultAsync();

        if(isNumberTaken != null){
            response = new Response<Owner?>(null, false, "Phone number is already taken");
            return StatusCode(409, response);
        }        

        owner.FirstName = ownerReq.FirstName!.Trim();
        owner.Surname = ownerReq.Surname!.Trim();
        owner.Phone = ownerReq.Phone!.Trim();

        await _context.SaveChangesAsync();

        response = new Response<Owner?>(owner, true, "Owner Successfully Updated");

        return Ok(response);
    }

    [HttpGet]
    [Route("get-pets/{userId:int}")]
    public async Task<ActionResult<Response<List<Pet>>>> getPets()
    {
        var userId = Convert.ToInt32(RouteData.Values["userId"]);

        var pets = await _context.PET
        .Where(p => p.OwnerId == userId)
        .ToListAsync();

        var response = new Response<List<Pet>>(pets, true, "Pets Retrieved");

        return Ok(response);
    }

    [HttpPost]
    [Route("{userId:int}/add-pet")]
    public async Task<ActionResult<Response<Pet?>>> addPet([FromBody] AddPetReq petReq){
        var userId = Convert.ToInt32(RouteData.Values["userId"]);
        var IsPet = await _context.PET
        .Where(p => p.OwnerId == userId)
        .Where(p => p.PetName == petReq.PetName)        
        .FirstOrDefaultAsync();

        Response<Pet?> response;

        if(IsPet != null){
            response = new Response<Pet?>(IsPet, false, "A Pet with this name already exists");
            return StatusCode(409, response);
        }

        var newPet = new Pet();

        newPet.PetName = petReq.PetName;
        newPet.OwnerId = petReq.OwnerID;
        newPet.Type = petReq.Type;

        await _context.PET.AddAsync(newPet);

        await _context.SaveChangesAsync();

        response = new Response<Pet?>(newPet, true, "Pet successfully created");

        return Ok(response);

    }

    [HttpGet]
    [Route("{userId:int}/view-treatments")]
    public async Task<ActionResult<Response<List<View_Treatment>>>> getTreatments(){
        var userId = Convert.ToInt32(RouteData.Values["userId"]);
        var treatments = await _context.View_TREATMENT
        .Where(t => t.OwnerId == userId)
        .ToListAsync();

        Response<List<View_Treatment>> response = new Response<List<View_Treatment>>(treatments, true, "Treatments Successfully returned");

        return Ok(response);
    }

    [HttpGet]
    [Route("get-procedures")]
    public async Task<ActionResult<Procedure>> GetProcedures(){
        var procedures = await _context.Procedure.ToListAsync();

        return Ok(procedures);
    }

    [HttpPost]
    [Route("add-treatment")]
    public async Task<ActionResult<Response<Treatment>>> addTreatment([FromBody] TreatmentReq treatmentReq){
        var treatment = new Treatment();

        
        treatment.Date = treatmentReq.Date;
        treatment.Notes = treatmentReq.Notes;
        treatment.FkPetId = treatmentReq.FkPetId;
        treatment.FkProcedureId = treatmentReq.FkProcedureId;
        treatment.Payment = 0;

        await _context.TREATMENT.AddAsync(treatment);
        await _context.SaveChangesAsync();

        var response = new Response<Treatment>(treatment, true, "Treatment Added");

        return Ok(response);
    }

}
