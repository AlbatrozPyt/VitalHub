using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services
    .AddControllers()
        .AddNewtonsoftJson(options =>
        {
            // Ignora os loopings nas consultas
            options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            // Ignora valores nulos ao fazer jun��es nas consultas
            options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
        }
    );

//Adiciona servi�o de Jwt Bearer (forma de autentica��o)
builder.Services.AddAuthentication(options =>
{
    options.DefaultChallengeScheme = "JwtBearer";
    options.DefaultAuthenticateScheme = "JwtBearer";
})

.AddJwtBearer("JwtBearer", options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        //valida quem est� solicitando
        ValidateIssuer = true,

        //valida quem est� recebendo
        ValidateAudience = true,

        //define se o tempo de expira��o ser� validado
        ValidateLifetime = true,

        //forma de criptografia e valida a chave de autentica��o
        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("vital-webapi-chave-symmetricsecuritykey")),

        //valida o tempo de expira��o do token
        ClockSkew = TimeSpan.FromMinutes(30),

        //nome do issuer (de onde est� vindo)
        ValidIssuer = "Vital-WebAPI",

        //nome do audience (para onde est� indo)
        ValidAudience = "Vital-WebAPI"
    };
});


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();


//Adicione o gerador do Swagger � cole��o de servi�os
builder.Services.AddSwaggerGen(options =>
{
    //Adiciona informa��es sobre a API no Swagger
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "API Vital",
        Description = "Backend API",
        Contact = new OpenApiContact
        {
            Name = "Senai Inform�tica"
        }
    });



    //Usando a autentica�ao no Swagger
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Value: Bearer TokenJWT ",
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
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
            new string[] {}
        }
    });
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder =>
        {
            builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

var app = builder.Build();

//Habilite o middleware para atender ao documento JSON gerado e � interface do usu�rio do Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Para atender � interface do usu�rio do Swagger na raiz do aplicativo
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    options.RoutePrefix = string.Empty;
});

app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();