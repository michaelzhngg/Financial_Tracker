using System.Text.Json.Serialization;
using Backend.API;
using Backend.Infrastructure;
using Backend.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

builder.Services.AddOpenApi();
builder.Services.AddInfrastructure(builder.Configuration);

// Allows the Vite dev server (and a phone on the same Wi-Fi) to call the API.
const string LocalNetworkCors = "LocalNetwork";

builder.Services.AddCors(options =>
{
    options.AddPolicy(LocalNetworkCors, policy => policy
        .SetIsOriginAllowed(_ => true)
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
}

app.UseMiddleware<ExceptionHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseCors(LocalNetworkCors);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGet("/api/health", () => Results.Ok(new { status = "ok", time = DateTimeOffset.Now })).AllowAnonymous();

app.Run();

