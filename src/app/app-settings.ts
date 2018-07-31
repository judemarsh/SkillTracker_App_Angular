import { environment } from "../environments/environment";

export class AppSettings {

    public static ASSOCIATE_SERVICE_BASE_URL : string = 'http://'+environment.serverHost+':'+environment.serverPort+'/skilltracker/associates';

    public static SKILL_SERVICE_BASE_URL : string = 'http://'+environment.serverHost+':'+environment.serverPort+'/skilltracker/skills';
}
