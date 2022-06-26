using API.models;
using Auth0.ManagementApi;
using Auth0.ManagementApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using RestSharp;

namespace API.Controllers;

[ApiController]
[Route("api/staff")]
public class StaffController : ControllerBase
{
    private readonly PetContext _context;

    public StaffController(PetContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Route("check-role")]
    [Authorize]  
    public ActionResult<Claims> CheckAdmin(){

        var permissions = HttpContext?.User.Claims.FirstOrDefault(c => c.Value == "write:admin");
        var claim = new Claims();
        claim.Claim = permissions?.Value;

        return Ok(claim);
    }

    [HttpGet]
    [Authorize("write:admin")]
    [Route("view-pets")]
    public async Task<ActionResult<List<Pet>>> ViewPets(){

        var pets = await _context.Pet        
        .ToListAsync();

        return Ok(pets);
    }

    [HttpGet]
    [Route("view-treatments")]
    [Authorize("write:admin")]
    public async Task<ActionResult<List<ViewTreatment>>> GetAllTreatments(){
        var treatments = await _context.view_Treatment
        .ToListAsync();

        //var response = new Response<List<Treatment>>(treatments, true, "treatments successfully returned");
        return Ok(treatments);
    }

    [HttpPost]
    [Authorize("write:admin")]
    [Route("create-treatment")]
    public async Task<ActionResult<Response<Treatment?>>> CreateTreatment([FromBody] Treatment treatmentReq)
    {
        var isPet = await _context.Pet
        .Where(p => p.OwnerId == treatmentReq.OwnerId)
        .Where(p => p.PetName == treatmentReq.PetName)
        .FirstOrDefaultAsync();

        Response<Treatment?> response;

        if (isPet == null){
            response = new Response<Treatment?>(null, false, "Pet and/or owner do not exist");
            return StatusCode(409, response);
        }

        var isProcedure = await _context.view_procedure
        .Where(p => p.ProcedureID == treatmentReq.ProcedureID)
        .FirstOrDefaultAsync();

        if(isProcedure == null){
            response = new Response<Treatment?>(null, false, "Procedure does not exist");
            return StatusCode(409, response);
        }

        await _context.AddAsync(treatmentReq);
        await _context.SaveChangesAsync();

        response = new Response<Treatment?>(treatmentReq, true, "Treatment has been added");

        return Ok(response);
    }

    [HttpPut]
    [Authorize("write:admin")]
    [Route("{treatmentID:int}/treatment-paid")]
    public async Task<ActionResult<Response<Treatment?>>> TreatmentPaid(){

        Response<Treatment?> response;

        var treatmentID = Convert.ToInt32(RouteData.Values["treatmentID"]);

        var treatment = await _context.Treatment
        .Where(t => t.ID == treatmentID)
        .FirstOrDefaultAsync();


        if (treatment == null){

            response = new Response<Treatment?>(null, false, "Treatment not found");
            return response;
        }

        var procedure = await _context.view_procedure
        .Where(p => p.ProcedureID == treatment!.ProcedureID)
        .FirstOrDefaultAsync();
        

        if(treatment!.Payment == procedure!.Price){
            response = new Response<Treatment?>(treatment, false, "Treatment has already been paid for.");
            return response;

        }else{
            var difference = procedure.Price - treatment.Payment;

            treatment.Payment = treatment.Payment + difference;

            await _context.SaveChangesAsync();
        }

        response = new Response<Treatment?>(treatment, true, "Treatment has been marked as paid");
        return response;
    }

    //todo create new procedures
}