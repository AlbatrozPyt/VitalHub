using Azure.Storage.Blobs;

namespace WebAPI.Utils.BlobStorage
{
    public static class AzureBlobStorageHelper
    {
        public static async Task<string> UploadImageBlobAsync(IFormFile arquivo, string stringConexao, string nomeContainer)
        {
			try
			{
				// Verifica se o arquivo não é nulo
				if (arquivo != null)
				{
					// Gera um nome único + extensão do arquivo
					var blobName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(arquivo.FileName);

					// Cria uma intancia do client Blob Service e passa a string de conexão
					var blobServiceClient = new BlobServiceClient(stringConexao);

					// Obtem um container client usando o nome do controlador do blob
					var blobContainerClient = blobServiceClient.GetBlobContainerClient(nomeContainer);

					// Obtem um blob client usando blob name
					var blobClient = blobContainerClient.GetBlobClient(blobName);

					// Abre o fluxo de entrada do arquivo
					using (var stream = arquivo.OpenReadStream())
					{
						// Carrega o arquivo(foto) para o blob storage de forma assincrona
						await blobClient.UploadAsync(stream, true);
					}

					// Retorna a URI do bloco como uma string
					return blobClient.Uri.ToString();
				}
				else
				{
					// Caso dê problema no carregamento da imagem, a padrão passará a ser utilizada
					return "https://blobvitalhubg15.blob.core.windows.net/containervitalhubpedro/profilepattern.webp";
				}
			}
			catch (Exception)
			{

				throw;
			}
        }
    }
}
