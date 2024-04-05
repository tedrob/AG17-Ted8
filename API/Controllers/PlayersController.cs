using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")] // /api/players
public class PlayersController : ControllerBase
{
    private readonly DataContext _context;

    public PlayersController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppPlayer>>> GetPlayers()
    {
        var players = await _context.Players.ToListAsync();

        return players;
    }

    [HttpGet("{id}")] // /api/players/3 
    public async Task<ActionResult<AppPlayer>> GetPlayer(int id)
    {
        return await _context.Players.FindAsync(id);
    }
}