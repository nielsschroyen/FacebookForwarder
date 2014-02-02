var Message = function(Title, Message) {
    var self = this;
    self.Title = ko.observable(Title);
    self.Message = ko.observable(Message);        
};

function MessageModel(messages) {
    var self = this;
    self.Messages = ko.observableArray(messages);   
};

//CreateNewBinding(new MessageModel([new Message("Test", "123"), new Message("Test", "1234")]));

function CreateNewBinding(model)
{
ko.applyBindings(model);
}
