// MVP: Only implementing ValidationError for now
// Other error types will be uncommented as needed in Week 2+

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Week 2+: Database error handling
// export class DatabaseError extends Error {
//   constructor(message: string) {
//     super(message);
//     this.name = 'DatabaseError';
//   }
// }

// Week 2+: Not found handling for search results
// export class NotFoundError extends Error {
//   constructor(message: string) {
//     super(message);
//     this.name = 'NotFoundError';
//   }
// }