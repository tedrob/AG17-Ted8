using API.Entities;

namespace API.Interfaces;

public interface IPlayerRepository
{
    void Update<AppPlayer> (AppPlayer player);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<AppPlayer>> GetPlayersAsync();
    Task<AppPlayer>GetPlayerByIdAsync (int id);
    Task<AppPlayer> GetPlayerByPlayernameAsync (string playername);
}