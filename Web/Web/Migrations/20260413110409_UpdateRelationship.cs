using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Ticket_TicketId",
                table: "Order");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Ticket_TicketId",
                table: "Order",
                column: "TicketId",
                principalTable: "Ticket",
                principalColumn: "TicketId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Ticket_TicketId",
                table: "Order");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Ticket_TicketId",
                table: "Order",
                column: "TicketId",
                principalTable: "Ticket",
                principalColumn: "TicketId",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
