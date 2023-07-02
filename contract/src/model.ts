export const POINT_ONE = '100000000000000000000000';

export class PostedMessage {
  premium: boolean;
  sender: string;
  text: string;
  total_amount: string;

  constructor({ premium, sender, text, total_amount = "0" }: PostedMessage) {
    this.premium = premium;
    this.sender = sender;
    this.text = text;
    this.total_amount = total_amount;
  }
}