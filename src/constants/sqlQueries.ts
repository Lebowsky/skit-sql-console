export const SQL_QUERY_GET_TABLES = `
  SELECT 
    name
  FROM 
    sqlite_master
  WHERE 
    type ='table' AND name <> 'android_metadata' AND
    name NOT LIKE 'sqlite_%';
`