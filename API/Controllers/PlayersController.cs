using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class PlayersController : BaseApiController
{
    private readonly IPlayerRepository _playerRepository;

    public PlayersController(IPlayerRepository playerRepository)
    {
        _playerRepository = playerRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppPlayer>>> GetPlayers()
    {
        return Ok(await _playerRepository.GetPlayersAsync());

    }

    [HttpGet("{playername}")] // /api/players/3 
    public async Task<ActionResult<AppPlayer>> GetPlayer(string playername)
    {
        return await _playerRepository.GetPlayerByPlayernameAsync(playername);
    }
}