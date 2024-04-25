using WebAPI.Domains;
using WebAPI.ViewModels;

namespace WebAPI.Interfaces
{
    public interface IMedicoRepository
    {
        public List<Medico> ListarTodos();
        public Medico BuscarPorId(Guid Id);
        public Medico AtualizarPerfil(Guid Id, MedicoViewModel medico);
        public void Cadastrar(Usuario medico);
        public List<Medico> ListarPorClinica(Guid id);
<<<<<<< HEAD
        public List<Consulta> BuscarPorData(DateTime dataConsulta, Guid id);
=======
        public List<Consulta> BuscarPorData(DateTime dataConsulta, Guid idMedico);
>>>>>>> b0c023c0d0514a6f345d32c4c4ea3b6639a03974
    }
}
