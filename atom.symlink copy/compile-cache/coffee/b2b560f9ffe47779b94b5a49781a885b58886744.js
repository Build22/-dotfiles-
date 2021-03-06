(function() {
  module.exports = {
    createTempFileWithCode: (function(_this) {
      return function(code) {
        if (!/^[\s]*<\?php/.test(code)) {
          code = "<?php " + code;
        }
        return module.parent.exports.createTempFileWithCode(code);
      };
    })(this)
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2phZGUvLmRvdGZpbGVzL2F0b20uc3ltbGluay9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXItdXRpbHMvcGhwLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUVBO0FBQUEsRUFBQSxNQUFNLENBQUMsT0FBUCxHQU1FO0FBQUEsSUFBQSxzQkFBQSxFQUF3QixDQUFBLFNBQUEsS0FBQSxHQUFBO2FBQUEsU0FBQyxJQUFELEdBQUE7QUFDdEIsUUFBQSxJQUFBLENBQUEsY0FBNEMsQ0FBQyxJQUFmLENBQW9CLElBQXBCLENBQTlCO0FBQUEsVUFBQSxJQUFBLEdBQVEsUUFBQSxHQUFRLElBQWhCLENBQUE7U0FBQTtlQUNBLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLHNCQUF0QixDQUE2QyxJQUE3QyxFQUZzQjtNQUFBLEVBQUE7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXhCO0dBTkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/jade/.dotfiles/atom.symlink/packages/script/lib/grammar-utils/php.coffee
