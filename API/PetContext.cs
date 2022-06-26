namespace API;

using Microsoft.EntityFrameworkCore;
using models;

public class PetContext: DbContext {
     protected readonly IConfiguration Configuration;

        public PetContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // connect to sql server with connection string from app settings
        options.UseSqlServer(Configuration["DB"]);
    }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
       modelBuilder.Entity<Owner>()
        .HasKey(o => new { o.OwnerId });

        modelBuilder.Entity<Pet>()
        .HasKey(p => new { p.OwnerId, p.PetName });

        modelBuilder.Entity<Treatment>()
        .HasKey(t => new { t.ID });

        modelBuilder.Entity<ViewTreatment>()
        .HasNoKey();

        modelBuilder.Entity<ProcedureView>()
        .HasNoKey();

        modelBuilder.Entity<Procedure>()
        .HasKey(p => new {p.ProcedureID});


    }

    public virtual DbSet<Owner> Owner { get; set; } = null!;
    public virtual DbSet<Pet> Pet { get; set; } = null!;
    public virtual DbSet<Treatment> Treatment { get; set; } = null!;
    public virtual DbSet<ViewTreatment> view_Treatment { get; set; } = null!;

    public virtual DbSet<ProcedureView> view_procedure { get; set; } = null!;
    public virtual DbSet<Procedure> Procedure { get; set; } = null!;
}