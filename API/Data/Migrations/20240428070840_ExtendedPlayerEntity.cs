using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class ExtendedPlayerEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AppPlayers",
                table: "AppPlayers");

            migrationBuilder.RenameTable(
                name: "AppPlayers",
                newName: "Players");

            migrationBuilder.RenameColumn(
                name: "Interest",
                table: "Users",
                newName: "Interests");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Players",
                table: "Players",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Players",
                table: "Players");

            migrationBuilder.RenameTable(
                name: "Players",
                newName: "AppPlayers");

            migrationBuilder.RenameColumn(
                name: "Interests",
                table: "Users",
                newName: "Interest");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppPlayers",
                table: "AppPlayers",
                column: "Id");
        }
    }
}
