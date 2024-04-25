using Azure.Storage.Blobs;

namespace WebAPI.Utils.BlobStorage
{
    public static class AzureBlobStorageHelper
    {
        public static async Task<string> UploadImageBlobAsync(IFormFile file, string connectionString, string nomeContainer)
        {
			try
			{
				if (file != null)
				{
					// gera um nome unico + extensao do arquivo
					var blobName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(file.FileName);

					// cria uma instancia do client Blob Service e passa a string de conexao
					var blobServiceClient = new BlobServiceClient(connectionString);

					// obtem um container client usando o nome do container do blob
					var blobContainerClient = blobServiceClient.GetBlobContainerClient(nomeContainer);

					// obtem um blob client usando o blob name
					var blobClient = blobContainerClient.GetBlobClient(blobName);

					// abre o fluxo de entrada do arquivo (foto)
					using (var stream = file.OpenReadStream())
					{
						// carrega o arquivo para a blob storage
						await blobClient.UploadAsync(stream, true);
					}

					// retorn a url da imagem
					return blobClient.Uri.ToString();
				}

				// imagem padrao
				else return "https://blobmatheusenrike.blob.core.windows.net/conteiner-mk/defaultpattern.png";
			}
			catch (Exception)
			{
				throw;
			}
        }
    }
}
