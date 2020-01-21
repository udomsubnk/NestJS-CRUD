export class UtilityFunctions {
  public static calculateDatabaseQueryOffset(page: number, limitPerQuery) {
    let offset = limitPerQuery * page - limitPerQuery;
    if (page < 0) offset = 0;

    return offset;
  }
}
