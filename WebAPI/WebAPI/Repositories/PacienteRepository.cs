using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Utils;
using WebAPI.ViewModels;

namespace WebAPI.Repositories
{
    public class PacienteRepository : IPacienteRepository
    {
        VitalContext ctx = new VitalContext();

        public Paciente AtualizarPerfil(Guid Id, PacienteViewModel paciente)
        {
            //foto
            //data nascimento
            //cpf
            //endereco logradouro numero cep

            Paciente pacienteBuscado = ctx.Pacientes.FirstOrDefault(x => x.Id == Id)!;
            Usuario usuarioBuscado = ctx.Usuarios.FirstOrDefault(x => x.Id == Id)!;
            Endereco endereco = ctx.Enderecos.FirstOrDefault(x => x.Id == pacienteBuscado.EnderecoId)!;


            if (paciente.Foto != null)
                usuarioBuscado.Foto = paciente.Foto;

            if (paciente.DataNascimento != null)
                pacienteBuscado!.DataNascimento = paciente.DataNascimento;

            if (paciente.Cpf != null)
                pacienteBuscado!.Cpf = paciente.Cpf;

            if (paciente.Logradouro != null)
                endereco.Logradouro = paciente.Logradouro;

            if (paciente.Numero != null)
                endereco.Numero = paciente.Numero;

            if (paciente.Cep != null)
                endereco.Cep = paciente.Cep;

            if (paciente.Rg != null)
                pacienteBuscado!.Rg = paciente.Rg;

            ctx.Pacientes.Update(pacienteBuscado!);
            ctx.Enderecos.Update(endereco);
            ctx.SaveChanges();

            return pacienteBuscado;
        }

        public List<Consulta> BuscarAgendadas(Guid Id)
        {
            return ctx.Consultas.Include(x => x.Situacao).Where(x => x.PacienteId == Id && x.Situacao.Situacao == "Agendada").ToList();
        }

        public List<Consulta> BuscarCanceladas(Guid Id)
        {
            return ctx.Consultas.Include(x => x.Situacao).Where(x => x.PacienteId == Id && x.Situacao.Situacao == "Cancelada").ToList();
        }

        public List<Consulta> BuscarPorData(DateTime dataConsulta, Guid idPaciente)
        {
           return ctx.Consultas
                .Include(x => x.Situacao)
                .Include(x => x.Prioridade)
                .Include (x => x.MedicoClinica!.Medico!.IdNavigation)
                .Where(x  => x.PacienteId == idPaciente && EF.Functions.DateDiffDay(x.DataConsulta, dataConsulta) == 0)
                .ToList();
        }

        public Paciente BuscarPorId(Guid Id)
        {
            return ctx.Pacientes
                .Include(x => x.IdNavigation)
                .Include(x => x.Endereco)
                .FirstOrDefault(x => x.Id == Id)!;
        }

        public List<Consulta> BuscarRealizadas(Guid Id)
        {
            return ctx.Consultas.Include(x => x.Situacao).Where(x => x.PacienteId == Id && x.Situacao.Situacao == "Realizada").ToList();
        }

        public void Cadastrar(Usuario user)
        {
            user.Senha = Criptografia.GerarHash(user.Senha!);
            ctx.Usuarios.Add(user);
            ctx.SaveChanges();
        }
    }
}
