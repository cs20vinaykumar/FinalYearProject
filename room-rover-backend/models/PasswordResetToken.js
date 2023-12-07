import { Schema, model } from 'mongoose';

const passwordResetTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
});

const PasswordResetToken = model('PasswordResetToken', passwordResetTokenSchema);

export default PasswordResetToken;
