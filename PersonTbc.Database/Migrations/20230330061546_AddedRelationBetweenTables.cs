using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PersonTbc.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddedRelationBetweenTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Genders");

            migrationBuilder.DropColumn(
                name: "Value",
                table: "Genders");

            migrationBuilder.AddColumn<int>(
                name: "Gender",
                table: "Genders",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Genders");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Genders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Value",
                table: "Genders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
