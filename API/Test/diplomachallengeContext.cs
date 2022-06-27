using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace API.Test
{
    public partial class diplomachallengeContext : DbContext
    {
        public diplomachallengeContext()
        {
        }

        public diplomachallengeContext(DbContextOptions<diplomachallengeContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Customer> Customers { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<Region> Regions { get; set; } = null!;
        public virtual DbSet<Segment> Segments { get; set; } = null!;
        public virtual DbSet<Shipping> Shippings { get; set; } = null!;
        public virtual DbSet<ViewProcedure> ViewProcedures { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=MSI;Initial Catalog=diploma-challenge;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.CatId)
                    .HasName("PK__Category__6A1C8AFAF4160C6D");

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
                    .HasConstraintName("FK__Customer__Region__4589517F");

                entity.HasOne(d => d.Seg)
                    .WithMany(p => p.Customers)
                    .HasForeignKey(d => d.SegId)
                    .HasConstraintName("FK__Customer__SegId__44952D46");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("Order");

                entity.Property(e => e.OrderDate).HasColumnType("datetime");

                entity.Property(e => e.ShipDate).HasColumnType("datetime");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK__Order__CustomerI__4C364F0E");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__Order__ProductId__4D2A7347");

                entity.HasOne(d => d.ShipModeNavigation)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.ShipMode)
                    .HasConstraintName("FK__Order__ShipMode__4E1E9780");
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
                    .HasConstraintName("FK__Product__CatId__4959E263");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK__Product__Custome__4865BE2A");
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
