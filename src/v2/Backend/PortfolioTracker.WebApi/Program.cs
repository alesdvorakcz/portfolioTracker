using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PortfolioTracker.WebApi;
using PortfolioTracker.WebApi.Database;
using PortfolioTracker.WebApi.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables(prefix: "pfv2_");

builder.Services.AddDbContext<AppDbContext>(options =>
{
    var dbConfig = builder.Configuration.GetSection("Database").Get<DatabaseConfig>();
    options.UseSqlServer(builder.Configuration.GetConnectionStringFrom(dbConfig),
        sqlServerOptionsAction: sqlOptions =>
        {
            sqlOptions.EnableRetryOnFailure(
                maxRetryCount: 5,
                maxRetryDelay: TimeSpan.FromSeconds(30),
                errorNumbersToAdd: null);
        });
});

builder.Services.AddAutoMapper(typeof(AssemblyLocator));
builder.Services
    .AddControllers()
    .AddJsonOptions(opts =>
    {
        var enumConverter = new JsonStringEnumConverter();
        opts.JsonSerializerOptions.Converters.Add(enumConverter);
    });

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "PortfolioTracker.WebApi", Version = "v1" });
});

var app = builder.Build();

// TODO: move this to unit tests
app.Services.GetRequiredService<AutoMapper.IMapper>().ConfigurationProvider.AssertConfigurationIsValid();

// Configure the HTTP request pipeline.
if (builder.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "PortfolioTracker.WebApi v1"));
}

app.UseAuthorization();
// app.UseCustomExceptionHandlerMiddleware();
app.MapControllers();

app.Run();
