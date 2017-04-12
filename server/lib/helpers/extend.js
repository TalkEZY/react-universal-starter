const blocks = {};

export default function extend(name, context) {
  let block = blocks[name];

  if (!block) {
    block = blocks[name] = [];
  }

  block.push(context);
}
