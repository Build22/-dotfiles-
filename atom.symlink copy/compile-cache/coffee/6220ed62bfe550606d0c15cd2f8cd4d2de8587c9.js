(function() {
  var $, RsenseClient, autocomplete;

  $ = require('jquery');

  autocomplete = require('./alchemide/wrapper');

  String.prototype.replaceAll = function(s, r) {
    return this.split(s).join(r);
  };

  module.exports = RsenseClient = (function() {
    RsenseClient.prototype.projectPath = null;

    RsenseClient.prototype.serverUrl = null;

    function RsenseClient() {
      autocomplete.init(atom.project.getPaths());
      atom.workspace.observeTextEditors(function(editor) {
        return editor.onDidSave(function(e) {
          return autocomplete.loadFile(e.path);
        });
      });
    }

    RsenseClient.prototype.checkCompletion = function(prefix, callback) {
      autocomplete.getAutocompletion(prefix, function(result) {
        result = result.one ? {
          result: [result.one],
          one: true
        } : {
          result: result.multi,
          one: false
        };
        return callback(result.result.map(function(a) {
          return {
            continuation: result.one,
            name: a,
            spec: a
          };
        }));
      });
      return [];
    };

    return RsenseClient;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2phZGUvLmRvdGZpbGVzL2F0b20uc3ltbGluay9wYWNrYWdlcy9hdXRvY29tcGxldGUtZWxpeGlyL2xpYi9hdXRvY29tcGxldGUtZWxpeGlyLWNsaWVudC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsNkJBQUE7O0FBQUEsRUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVIsQ0FBSixDQUFBOztBQUFBLEVBQ0EsWUFBQSxHQUFlLE9BQUEsQ0FBUSxxQkFBUixDQURmLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQWpCLEdBQThCLFNBQUMsQ0FBRCxFQUFHLENBQUgsR0FBQTtXQUFTLElBQUMsQ0FBQSxLQUFELENBQU8sQ0FBUCxDQUFTLENBQUMsSUFBVixDQUFlLENBQWYsRUFBVDtFQUFBLENBRjlCLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osMkJBQUEsV0FBQSxHQUFhLElBQWIsQ0FBQTs7QUFBQSwyQkFDQSxTQUFBLEdBQVcsSUFEWCxDQUFBOztBQUdhLElBQUEsc0JBQUEsR0FBQTtBQUNYLE1BQUEsWUFBWSxDQUFDLElBQWIsQ0FBa0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFiLENBQUEsQ0FBbEIsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFmLENBQWtDLFNBQUMsTUFBRCxHQUFBO2VBQ2hDLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFNBQUMsQ0FBRCxHQUFBO2lCQUNmLFlBQVksQ0FBQyxRQUFiLENBQXNCLENBQUMsQ0FBQyxJQUF4QixFQURlO1FBQUEsQ0FBakIsRUFEZ0M7TUFBQSxDQUFsQyxDQURBLENBRFc7SUFBQSxDQUhiOztBQUFBLDJCQVNBLGVBQUEsR0FBaUIsU0FBQyxNQUFELEVBQVMsUUFBVCxHQUFBO0FBRWYsTUFBQSxZQUFZLENBQUMsaUJBQWIsQ0FBK0IsTUFBL0IsRUFBdUMsU0FBQyxNQUFELEdBQUE7QUFFckMsUUFBQSxNQUFBLEdBQVksTUFBTSxDQUFDLEdBQVYsR0FDTjtBQUFBLFVBQUMsTUFBQSxFQUFRLENBQUMsTUFBTSxDQUFDLEdBQVIsQ0FBVDtBQUFBLFVBQXVCLEdBQUEsRUFBSyxJQUE1QjtTQURNLEdBR0w7QUFBQSxVQUFDLE1BQUEsRUFBUSxNQUFNLENBQUMsS0FBaEI7QUFBQSxVQUF1QixHQUFBLEVBQUssS0FBNUI7U0FISixDQUFBO2VBSUEsUUFBQSxDQUFTLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBZCxDQUFrQixTQUFDLENBQUQsR0FBQTtpQkFBTTtBQUFBLFlBQUMsWUFBQSxFQUFjLE1BQU0sQ0FBQyxHQUF0QjtBQUFBLFlBQTBCLElBQUEsRUFBTSxDQUFoQztBQUFBLFlBQW1DLElBQUEsRUFBSyxDQUF4QztZQUFOO1FBQUEsQ0FBbEIsQ0FBVCxFQU5xQztNQUFBLENBQXZDLENBQUEsQ0FBQTtBQU9BLGFBQU8sRUFBUCxDQVRlO0lBQUEsQ0FUakIsQ0FBQTs7d0JBQUE7O01BTkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/jade/.dotfiles/atom.symlink/packages/autocomplete-elixir/lib/autocomplete-elixir-client.coffee
