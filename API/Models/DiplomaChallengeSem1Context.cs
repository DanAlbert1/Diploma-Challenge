using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace API.Models
{
    public class DiplomaChallengeSem1Context : DbContext
    {
        public DiplomaChallengeSem1Context()
        {
        }

        public virtual DbSet<Owner> OWNER { get; set; } = null!;
        public virtual DbSet<Pet> PET { get; set; } = null!;
        public virtual DbSet<Procedure> Procedure { get; set; } = null!;
        public virtual DbSet<Treatment> TREATMENT { get; set; } = null!;

        public virtual DbSet<View_Treatment> View_TREATMENT { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=DESKTOP-CQVULK8;Initial Catalog=DiplomaChallengeSem1;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Owner>(entity =>
            {
                entity.ToTable("OWNER");

                entity.HasIndex(e => e.Phone, "UN_OWNER")
                    .IsUnique();

                entity.Property(e => e.FirstName).HasMaxLength(300);

                entity.Property(e => e.Phone).HasMaxLength(300);

                entity.Property(e => e.Surname).HasMaxLength(300);
            });

            modelBuilder.Entity<Pet>()
            .HasKey(p => new { p.Id });

            modelBuilder.Entity<Procedure>()
            .HasKey(p =>  p.Id );

            modelBuilder.Entity<Treatment>(entity =>
            {
                entity.Property(t => t.FkPetId).HasColumnName("FK_PetId");
                entity.Property(t => t.FkProcedureId).HasColumnName("FK_ProcedureId");
                entity.HasKey(t => t.Id);
            });

            modelBuilder.Entity<ViewProcedure>(entity =>
            {
                entity.HasNoKey();
            });

            modelBuilder.Entity<View_Treatment>(entity =>
            {
                entity.Property(t => t.FkPetId).HasColumnName("FK_PetId");                
                entity.HasNoKey();
            });
        }
    }
}
