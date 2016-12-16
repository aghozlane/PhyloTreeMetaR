#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
PhyloTreeMetaR <- function(data,dataf, width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    data = data,
    dataf =dataf
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'PhyloTreeMetaR',
    x,
    width = '100%',
    height = '100%',
    package = 'PhyloTreeMetaR',
    elementId = elementId
  )
}

#' Shiny bindings for PhyloTreeMetaR
#'
#' Output and render functions for using PhyloTreeMetaR within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a PhyloTreeMetaR
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name PhyloTreeMetaR-shiny
#'
#' @export
PhyloTreeMetaROutput <- function(outputId, width = '100%', height = '100%'){
  htmlwidgets::shinyWidgetOutput(outputId, 'PhyloTreeMetaR', width, height, package = 'PhyloTreeMetaR')
}

#' @rdname PhyloTreeMetaR-shiny
#' @export
renderPhyloTreeMetaR <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, PhyloTreeMetaROutput, env, quoted = TRUE)
}
