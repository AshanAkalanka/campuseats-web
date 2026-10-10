using System.Text;
using CampusEats.Api.Data;
using CampusEats.Api.Models;
using CampusEats.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddCors(o => o.AddPolicy("Frontend", p =>
    p.AllowAnyOrigin()
     .AllowAnyHeader()
     .AllowAnyMethod()));
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition(
        "Bearer",
        new OpenApiSecurityScheme
        {
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            Description = "Paste ONLY the token - no 'Bearer ' prefix."
        });

    c.AddSecurityRequirement(
        new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },

                Array.Empty<string>()
            }
        });
});

builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseNpgsql(
        builder.Configuration
            .GetConnectionString("Default")));

builder.Services.AddScoped<IMenuService, MenuService>(); 

var jwt = builder.Configuration.GetSection("Jwt");

var key = Encoding.UTF8.GetBytes(jwt["Key"]!);

builder.Services
    .AddAuthentication(
        JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
        opt.TokenValidationParameters = new()
        {
            ValidateIssuer = true,
            ValidIssuer = jwt["Issuer"],

            ValidateAudience = true,
            ValidAudience = jwt["Audience"],

            ValidateIssuerSigningKey = true,

            IssuerSigningKey =
                new SymmetricSecurityKey(key),

            ValidateLifetime = true
        });

builder.Services.AddAuthorization();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider
        .GetRequiredService<AppDbContext>();

    // Automatically apply migrations to the database on startup!
    db.Database.Migrate();

    // Remove any test items like "test123"
    var testItems = db.MenuItems.Where(m => m.Name.ToLower().Contains("test123")).ToList();
    if (testItems.Any())
    {
        db.MenuItems.RemoveRange(testItems);
        db.SaveChanges();
    }

    // Remove last 5 dishes if present in database
    var dishesToRemove = new[] { "Samosa", "Chocolate Brownie", "Fruit Salad", "Lime Juice", "Milk Tea" };
    var itemsToDelete = db.MenuItems.Where(m => dishesToRemove.Contains(m.Name)).ToList();
    if (itemsToDelete.Any())
    {
        db.MenuItems.RemoveRange(itemsToDelete);
        db.SaveChanges();
    }

    var defaultDishes = new List<MenuItem>
    {
        new MenuItem { Name = "Kottu Roti", Price = 750m, Category = "Mains", Available = true },
        new MenuItem { Name = "Fried Rice", Price = 850m, Category = "Mains", Available = true },
        new MenuItem { Name = "Veg Sub", Price = 600m, Category = "Snacks", Available = false },
        new MenuItem { Name = "Watalappan", Price = 350m, Category = "Dessert", Available = true },
        new MenuItem { Name = "Iced Milo", Price = 300m, Category = "Drinks", Available = true },
        new MenuItem { Name = "Chicken Burger", Price = 650m, Category = "Snacks", Available = true },
        new MenuItem { Name = "Egg Roti", Price = 200m, Category = "Snacks", Available = true },
        new MenuItem { Name = "String Hoppers", Price = 400m, Category = "Mains", Available = true },
        new MenuItem { Name = "Milk Rice", Price = 350m, Category = "Mains", Available = true }
    };

    foreach (var dish in defaultDishes)
    {
        if (!db.MenuItems.Any(m => m.Name == dish.Name))
        {
            db.MenuItems.Add(dish);
        }
    }
    db.SaveChanges();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();

    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("Frontend"); // Apply the CORS policy
app.UseAuthentication(); 
app.UseAuthorization(); 
app.MapControllers();
app.Run();