export const auditableSchema = (schema) => {
  schema.add({createdAt: {type: Date}});
  schema.add({updatedAt: {type: Date}});
  schema.add({deletedAt: {type: Date, default: null}});

  schema.add({createdBy: {type: String, default: null}});
  schema.add({updatedBy: {type: String, default: null}});
  schema.add({deletedBy: {type: String, default: null}});
  
  schema.pre('find', function() {
    this.where(
      {deletedAt: null}
    );
  });
}