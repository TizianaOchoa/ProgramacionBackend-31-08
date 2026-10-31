export default {
  default: {
    paths: ["tests/features/**/*.feature"],
    require: ["tests/step_definitions/**/*.ts"],
    requireModule: ["tsx/cjs"]
  }
};