const blocks = {};
export default function block(name) {
  const val = (blocks[name] || []).join("\n");
  // clear the block
  blocks[name] = [];
  return val;
}
