import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema(
  {
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  },
  history1: {
    type: Boolean,
    default: false
  },
  history2: {
    type: Boolean,
    default: false
  },
  history3: {
    type: Boolean,
    default: false
  },
  history4: {
    type: Boolean,
    default: false
  }
}
,
  {
    timestamps: {
      currentTime: () => {
        var dt = new Date();
        dt.setHours(dt.getHours());
        return dt;
      },
    },
  });

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;