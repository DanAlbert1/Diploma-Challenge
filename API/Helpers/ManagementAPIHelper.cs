using Auth0.ManagementApi;
using Newtonsoft.Json.Linq;
using RestSharp;

namespace API.Helpers
{

    public class ManagementHelper{

        public ManagementHelper()
        {
            
        }

        public string GetManagementToken(IConfiguration configuration){

            var client = new RestClient(configuration["Auth0:Domain"]);
            var request = new RestRequest("/oauth/token", Method.Post);
            request.AddHeader("content-type", "application/json");
            request.AddParameter("application/json", "{\"client_id\":\"kUAAhoahZIBdb6SMoQZbryn9fZ6WIbsy\",\"client_secret\":\"zTHQ3l3jxD_coV1WO5xJGe1GyXOdZfwapI54k-EPLc3l4NuuyHAvm9c1UpwlObhN\",\"audience\":\"https://dev-tt6-hw09.us.auth0.com/api/v2/\",\"grant_type\":\"client_credentials\"}", ParameterType.RequestBody);
            request.AddBody(new{
                client_id = configuration["Auth0:ManagementClientID"],
                client_secret= configuration["Auth0:ManagementClientSecret"],
                audience= configuration["Auth0:ManagementAudience"],
                grant_type="client_credentials"
            });
            RestResponse tokenResponse = client.Execute(request);
            dynamic token = tokenResponse.Content != null ? JObject.Parse(tokenResponse.Content)["access_token"]!.ToString() : "";


            return token;
        }
    }
    
}