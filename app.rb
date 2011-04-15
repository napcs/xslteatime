require 'sinatra'
require 'haml' 
require 'lib/xslteatime'
require 'json'

# http://code.google.com/apis/libraries/devguide.html#jqueryUI
JQUERY = "http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"
JQUERY_UI = "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/jquery-ui.min.js"

set :haml, {:format => :html5 }

get '/stylesheets/app.css' do
  content_type 'text/css', :charset => 'utf-8'
  sass :app
end

get '/' do
  if @code.nil?
   @code = File.read("lib/xml_template.xml") 
  end
  if @xslt.nil?
   @xslt = File.read("lib/xslt_template.xsl") 
  end
  @output ||= ""
  haml :index
  
end

post "/" do
  @code = params[:code]
  @xslt = params[:xslt]
  x = Xslteatime.new(@code, @xslt)
  @output = x.convert
  @errors = x.errors unless @output

  if request.xhr?
    content_type :json
    {:render => @output, :errors => @errors}.to_json
  else
    haml :index
  end
end

                                    
