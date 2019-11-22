import { NextFunction, Request, Response, Router } from "express";


/**
 * IndexRoute
 * 
 * @class IndexRoute
 */
export class IndexRoute  {

  private static ins: IndexRoute = new IndexRoute();

  /**
   * Create the router
   * 
   * @class IndexRoute
   * @method create
   * @static
   * @param router 
   */
  public static create(router: Router) {
    
    // add home page route
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      this.ins.index(req, res, next);
    })

    //todo: 添加其他url映射
  }

  /**
   * The home page route
   * 
   * @class IndexRoute
   * @method index
   * @param req {Request} The express Request Object.
   * @param res {Response} The express Response Object.
   * @param next {NextFunction} Execute the next method.
   */
  public index(req: Request, res: Response, next: NextFunction) {
    res.render('index', { title: 'Express' });
  }
}