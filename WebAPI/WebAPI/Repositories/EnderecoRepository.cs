using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;

namespace WebAPI.Repositories
{
    public class EnderecoRepository : IEnderecoInterface
    {
        public VitalContext ctx = new VitalContext();

        public List<Endereco> Cidades(string cidade)
        {
            return ctx.Enderecos
                .Select(e => new Endereco
                {
                    Cidade = e.Cidade,
                    Clinicas = e.Clinicas
                })
                .Where(x => x.Cidade == cidade && x.Clinicas.Count != 0)
                .ToList();

        }
    }
}
