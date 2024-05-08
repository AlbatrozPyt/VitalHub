using WebAPI.Domains;

namespace WebAPI.Interfaces
{
    public interface IEnderecoInterface
    {
        public List<Endereco> Cidades(string cidade);
    }
}
