namespace PersonTbc.Data.DatabaseRepository;

public interface IRepository<TEntity> where TEntity : class
{
    TEntity GetById(int id);
    IEnumerable<TEntity> GetAll();
    Task Add(TEntity entity);
    Task Update(TEntity entity);
    Task Remove(TEntity entity);
}