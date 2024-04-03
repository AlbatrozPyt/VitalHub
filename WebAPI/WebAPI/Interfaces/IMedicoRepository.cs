using WebAPI.Controllers;
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

        public List<Consulta> BuscarPorData(DateTime dataConsulta, Guid idMedico);
=======
        public List<Consulta> BuscarPorData(DateTime dataConsulta, Guid id);
>>>>>>> 6218c0022e1cbb725f8820834a9f788c7088c898
    }
}
