using System;
using System.Collections.Generic;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace API.Test
{
    public partial class diplomachallengeContext : DbContext
    {

        private IConfiguration configuration;
        public diplomachallengeContext(IConfiguration _configuration)
        {
            configuration = _configuration;
        }

        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Customer> Customers { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<Region> Regions { get; set; } = null!;
        public virtual DbSet<Segment> Segments { get; set; } = null!;
        public virtual DbSet<Shipping> Shippings { get; set; } = null!;
        public virtual DbSet<ViewProcedure> ViewProcedures { get; set; } = null!;
        public virtual DbSet<ViewOrders> view_orders { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //optionsBuilder.UseSqlServer("Data Source=MSI;Initial Catalog=diploma-challenge;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
                optionsBuilder.UseSqlServer(configuration["DB"]);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ViewOrders>().HasNoKey();

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.CatId)
                    .HasName("PK__Category__6A1C8AFA3FBD1CB5");

                entity.ToTable("Category");

                entity.Property(e => e.CatName).HasMaxLength(300);
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("Customer");

                entity.Property(e => e.City).HasMaxLength(300);

                entity.Property(e => e.Country).HasMaxLength(300);

                entity.Property(e => e.CustId).HasMaxLength(300);

                entity.Property(e => e.FullName).HasMaxLength(300);

                entity.Property(e => e.State).HasMaxLength(300);

                entity.HasOne(d => d.RegionNavigation)
                    .WithMany(p => p.Customers)
                    .HasForeignKey(d => d.Region)
                    .HasConstraintName("FK__Customer__Region__7FB5F314");

                entity.HasOne(d => d.Seg)
                    .WithMany(p => p.Customers)
                    .HasForeignKey(d => d.SegId)
                    .HasConstraintName("FK__Customer__SegId__7EC1CEDB");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("Order");

                entity.Property(e => e.OrderDate).HasColumnType("datetime");

                entity.Property(e => e.ShipDate).HasColumnType("datetime");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK__Order__CustomerI__056ECC6A");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__Order__ProductId__0662F0A3");

                entity.HasOne(d => d.ShipModeNavigation)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.ShipMode)
                    .HasConstraintName("FK__Order__ShipMode__075714DC");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Product");

                entity.Property(e => e.Description).HasMaxLength(300);

                entity.Property(e => e.ProdId).HasMaxLength(300);

                entity.Property(e => e.UnitPrice).HasColumnType("decimal(18, 0)");

                entity.HasOne(d => d.Cat)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.CatId)
                    .HasConstraintName("FK__Product__CatId__02925FBF");
            });

            modelBuilder.Entity<Region>(entity =>
            {
                entity.ToTable("Region");

                entity.Property(e => e.Region1)
                    .HasMaxLength(300)
                    .HasColumnName("Region");
            });

            modelBuilder.Entity<Segment>(entity =>
            {
                entity.ToTable("Segment");

                entity.Property(e => e.SegName).HasMaxLength(300);
            });

            modelBuilder.Entity<Shipping>(entity =>
            {
                entity.ToTable("Shipping");

                entity.Property(e => e.ShipMode).HasMaxLength(300);
            });

            modelBuilder.Entity<ViewProcedure>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("view_PROCEDURE");

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.Description).HasMaxLength(300);

                entity.Property(e => e.OwnerId).HasColumnName("OwnerID");

                entity.Property(e => e.PetName).HasMaxLength(300);

                entity.Property(e => e.Price).HasColumnType("money");

                entity.Property(e => e.ProcedureId).HasColumnName("ProcedureID");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
