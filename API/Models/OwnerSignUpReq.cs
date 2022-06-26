
namespace API.models
{
    public class OwnerSignUpReq
    {
        public OwnerSignUpReq(){

        }

        public string? firstName { get; set; }
        public string? lastName { get; set; }
        public string? phoneNumber { get; set; }
        public string? email { get; set; }
        public string? password { get; set; }


    }
}