import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const DB_LOG = ( message : string ) => console.log( `[DB]: ${ message }` );

const pool = mysql.createPool({
	host: DB_HOST,
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME,
	connectionLimit: 10
});

export const queryToDB = ( query : string, params : any[] ) : Promise<any> => {
	return new Promise( (resolve, reject) => {
		pool.query( query, params, (err, result) => {
			if (err) {
				DB_LOG('error:' + err + '\n');
				reject( err );
			}
			resolve( result );
		});
	});
}

export const closeConnection = ( ) => {
	pool.end((err) => {
		if (err) DB_LOG('error:' + err + '\n');
		else DB_LOG('Connection closed successfully	\n');
	});
};
