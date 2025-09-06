import type { NextFunction, Request, Response } from "express";
interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    playlist: string[];
}
interface AuthenticatedReq extends Request {
    user?: IUser | null;
}
export declare const isAuth: (req: AuthenticatedReq, res: Response, next: NextFunction) => Promise<void>;
declare const uploadFile: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export default uploadFile;
//# sourceMappingURL=middleware.d.ts.map