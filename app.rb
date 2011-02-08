require 'sinatra'
require 'haml' 
require 'lib/xslteatime'

JQUERY = "http://ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.min.js"
JQUERY_UI = "http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js"

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
  haml :index
end

                                    