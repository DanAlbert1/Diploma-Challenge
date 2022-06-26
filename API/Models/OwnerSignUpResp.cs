
namespace API.models
{
    public class OwnerSignUpResp
    {
        public OwnerSignUpResp(){

        }

        public string? _id { get; set; }
        public Boolean email_verified { get; set; }
        public string? email { get; set; }     
        public string? given_name { get; set; }     
        public string? family_name { get; set; }       
    }
}