class Config {

}
class DevelopmentConfig extends Config {
    public isDevelopment = true;
    // public assignmentsUrl = "http://192.168.14.4:3000/api/assignments/";
    // public assignmentsImageUrl = "http://192.168.14.4:3000/assets/images/";
    // public socketUrl = "http://localhost:3000";
    public baseUrl = "http://192.168.14.4:3000/api";
    public registerUrl = "http://192.168.14.4:3000/api/auth/register/";
    public loginUrl = "http://192.168.14.4:3000/api/auth/login";
}

// class ProductionConfig extends Config {
//     public isDevelopment = false;
//     public followersUrl = "https://travel-by-nir.herokuapp.com/api/followers/";
//     public vacationsUrl = "https://travel-by-nir.herokuapp.com/api/vacations/";
//     public vacationsImageUrl = "https://travel-by-nir.herokuapp.com/assets/images/";
//     public registerUrl = "https://travel-by-nir.herokuapp.com/api/auth/register/";
//     public loginUrl = "https://travel-by-nir.herokuapp.com/api/auth/login/";
//     public contactUs = "https://travel-by-nir.herokuapp.com/api/contact/email/";
//     public socketUrl = "https://travel-by-nir.herokuapp.com/";
// }


const config = new DevelopmentConfig()


export default config;