
export interface IAppConfig {
	env ?: string;
	express ?: ICExpress;
	mongodb ?: ICMongoDB;
	mysql ?: ICMySQL;
	crypto ?: ICCrypro;
}
export interface ICExpress {
	port ?: number;
}
export interface ICMongoDB {
	username : string;
	password : string;
	host : string;
	port : number;
	database : string;
}
export interface ICMySQL {
	connectionLimit : number;
	host : string;
	port : number;
	user : string;
	password : string;
	database : string;
}
export interface ICCrypro {
	salt ?: string;
	secret ?: string;
}
