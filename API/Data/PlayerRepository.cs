using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class PlayerRepository : IPlayerRepository
{
    private readonly DataContext _context;
    public PlayerRepository(DataContext context)
    {
        _context = context;

    }
    public async Task<IEnumerable<AppPlayer>> GetPlayersAsync()
    {
        return await _context.Players.ToListAsync();
    }

    public async Task<AppPlayer> GetPlayerByIdAsync(int id)
    {
        return await _context.Players.FindAsync(id);
    }

    public async Task<AppPlayer> GetPlayerByPlayernameAsync(string playername)
    {
        return await _context.Players.SingleOrDefaultAsync(x => x.PlayerName == playername);
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;;
    }

    public void Update<AppPlayer>(AppPlayer player)
    {
        _context.Entry(player).State = EntityState.Modified;
    }
}