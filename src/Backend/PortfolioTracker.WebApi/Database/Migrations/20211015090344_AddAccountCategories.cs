using Microsoft.EntityFrameworkCore.Migrations;

namespace PortfolioTracker.WebApi.Database.Migrations
{
    public partial class AddAccountCategories : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Accounts");
        }
    }
}
