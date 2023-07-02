import { NearBindgen, near, call, view, Vector } from 'near-sdk-js'
import { POINT_ONE, PostedMessage } from './model'

@NearBindgen({})
class Issues {
  messages: Vector<PostedMessage> = new Vector<PostedMessage>("v-uid");

  @call({ payableFunction: true })
  // Public - Adds a new message.
  add_message({ text }: { text: string }) {
    // If the user attaches more than 0.1N the message is premium
    const premium = near.attachedDeposit() >= BigInt(POINT_ONE);
    const sender = near.predecessorAccountId();
    const donation = near.attachedDeposit() || BigInt(0);
     //check if the meassage exsit in the vector
     const messagesToArr = this.messages.toArray();
     for (let i = 0; i < messagesToArr.length; i++) {
      if (messagesToArr[i].text == text) {
        messagesToArr[i].total_amount = (BigInt(messagesToArr[i].total_amount || '0') + donation).toString();
        //assign the new array to the vector index
        this.messages.replace(i, messagesToArr[i]);
        return;
      }
    }
    const message: PostedMessage = { premium, sender, text, total_amount: donation.toString() };
    this.messages.push(message);
  }

  @view({})
  // Returns an array of messages.
  get_messages({ from_index = 0, limit = 10 }: { from_index: number, limit: number }): PostedMessage[] {
    return this.messages.toArray().slice(from_index, from_index + limit);
  }

  @view({})
  total_messages(): number { return this.messages.length }
}