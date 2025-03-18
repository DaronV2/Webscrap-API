/**
 * The types are explicity for learning purpose
 */

import {
    createPool,
    PoolOptions,
    Pool,
    ResultSetHeader,
    RowDataPacket,
    PoolConnection,
  } from 'mysql2/promise';
  
  export class MySQL {
    private conn: Pool;
    private credentials: PoolOptions;
  
    constructor(credentials: PoolOptions) {
      this.credentials = credentials;
      this.conn = createPool(this.credentials);
    }
  
    /** A random method to simulate a step before to get the class methods */
    private ensureConnection() {
      if (!this?.conn) this.conn = createPool(this.credentials);
    }
  
    /** For `SELECT` and `SHOW` */
    get queryRows() {
      this.ensureConnection();
      return this.conn.query.bind(this.conn)<RowDataPacket[]>;
    }
  
    /** For `SELECT` and `SHOW` with `rowAsArray` as `true` */
    get queryRowsAsArray() {
      this.ensureConnection();
      return this.conn.query.bind(this.conn)<RowDataPacket[][]>;
    }
  
    /** For `INSERT`, `UPDATE`, etc. */
    get queryResult() {
      this.ensureConnection();
      return this.conn.query.bind(this.conn)<ResultSetHeader>;
    }
  
    /** For multiple `INSERT`, `UPDATE`, etc. with `multipleStatements` as `true` */
    get queryResults() {
      this.ensureConnection();
      return this.conn.query.bind(this.conn)<ResultSetHeader[]>;
    }
  
    /** For `SELECT` and `SHOW` */
    get executeRows() {
      this.ensureConnection();
      return this.conn.execute.bind(this.conn)<RowDataPacket[]>;
    }
  
    /** For `SELECT` and `SHOW` with `rowAsArray` as `true` */
    get executeRowsAsArray() {
      this.ensureConnection();
      return this.conn.execute.bind(this.conn)<RowDataPacket[][]>;
    }
  
    /** For `INSERT`, `UPDATE`, etc. */
    get executeResult() {
      this.ensureConnection();
      return this.conn.execute.bind(this.conn)<ResultSetHeader>;
    }
  
    /** For multiple `INSERT`, `UPDATE`, etc. with `multipleStatements` as `true` */
    get executeResults() {
      this.ensureConnection();
      return this.conn.execute.bind(this.conn)<ResultSetHeader[]>;
    }
  
    /** Expose the Pool Connection */
    get connection() {
      return this.conn;
    }

    /**
   * Execute a transaction
   * @param operations An array of functions that return promises, each representing a database operation
   */
  async executeTransaction(operations: Array<(connection: PoolConnection) => Promise<any>>): Promise<void> {
    const connection = await this.conn.getConnection();
    try {
      await connection.beginTransaction();

      for (const operation of operations) {
        await operation(connection);
      }

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      console.error('Transaction failed, rolled back.', error);
      throw error;
    } finally {
      connection.release();
    }
  }
  }