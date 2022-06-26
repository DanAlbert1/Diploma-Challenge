using System.Security.Claims;
using API;
using API.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

var  AllowPetsApp = "_allowPetsApp";


//add cors
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: AllowPetsApp,
        policy =>
        {
            policy.WithOrigins(
                "https://localhost:4200",
                "http://localhost:4200",
                "https://challenge-app-one.azurewebsites.net"
                );
            policy.AllowCredentials();
            policy.AllowAnyHeader();            
            policy.AllowAnyMethod();
        }
    );
});

string domain = builder.Configuration["Auth0:Domain"];

// Add services to the container.

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(options =>
{
    options.Authority = domain;
    options.Audience = builder.Configuration["Auth0:Audience"];

    options.TokenValidationParameters = new TokenValidationParameters
    {
        NameClaimType = ClaimTypes.NameIdentifier
    };
});

builder.Services.AddAuthorization(options =>
{
     options.AddPolicy("read:message", policy => policy.Requirements.Add(new HasScopeRequirement("read:message", domain)));     
     options.AddPolicy("write:admin", policy => policy.Requirements.Add(new HasScopeRequirement("write:admin", domain)));   
});

builder.Services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();

builder.Services.AddDbContext<PetContext>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(AllowPetsApp);

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
